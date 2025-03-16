from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import vision
import openai
import supabase
import base64
import os
from datetime import datetime

app = FastAPI()

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 初始化 Supabase
supabase_client = supabase.create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

# 初始化 Google Cloud Vision
vision_client = vision.ImageAnnotatorClient()

# 初始化 OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.post("/api/upload-screenshot")
async def upload_screenshot(image: UploadFile = File(...)):
    try:
        # 读取图片数据
        image_data = await image.read()
        # 调用 Google Cloud Vision OCR
        image = vision.Image(content=image_data)
        response = vision_client.text_detection(image=image)
        text = response.text_annotations[0].description if response.text_annotations else ""
        # 调用 OpenAI 润色
        polished_text = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"Polish this code question: {text}",
            max_tokens=100
        ).choices[0].text
        # 存储到 Supabase
        supabase_client.table("code_questions").insert({
            "original_text": text,
            "polished_text": polished_text,
            "created_at": datetime.utcnow().isoformat()  # 添加创建时间
        }).execute()
        return {"polished_text": polished_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)