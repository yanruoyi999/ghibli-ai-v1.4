import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("🧪 测试API被调用");
    
    const { prompt, aspectRatio = "1:1" } = await request.json();
    
    // 模拟处理时间
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 返回模拟的成功响应
    const mockResponse = {
      success: true,
      imageUrl: "https://picsum.photos/800/600?random=" + Date.now(),
      message: "测试图片生成成功！",
      stats: {
        totalTime: "2000ms",
        model: "test-mock",
        aspectRatio: aspectRatio,
        promptLength: prompt?.length || 0
      }
    };
    
    console.log("🧪 测试API返回:", mockResponse);
    
    return NextResponse.json(mockResponse);
    
  } catch (error: any) {
    console.error("🧪 测试API错误:", error);
    return NextResponse.json({
      success: false,
      error: "测试API失败",
      message: error.message || "测试失败",
      details: error.toString()
    }, { status: 500 });
  }
} 