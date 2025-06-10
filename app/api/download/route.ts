import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, fileName } = await request.json();
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    console.log(`🔄 开始代理下载图片: ${imageUrl}`);
    
    // 从服务器端获取图片
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/png';
    
    console.log(`✅ 图片下载成功，大小: ${(buffer.byteLength / 1024 / 1024).toFixed(2)}MB`);
    
    // 设置下载响应头
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName || 'ghibli-image.png'}"`,
        'Content-Length': buffer.byteLength.toString(),
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('❌ 代理下载图片失败:', error);
    return NextResponse.json(
      { error: 'Failed to download image' }, 
      { status: 500 }
    );
  }
} 