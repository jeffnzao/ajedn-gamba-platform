import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            companyName: true,
            email: true,
            userType: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la récupération des publications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, category, fileUrl, email } = body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ success: false, error: 'Auteur non trouvé avec cet email.' }, { status: 404 });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        category,
        fileUrl,
        authorId: user.id,
      },
    });

    return NextResponse.json({ success: true, data: newPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la création de la publication' }, { status: 500 });
  }
}