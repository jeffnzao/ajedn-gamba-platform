import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, phone, whatsapp, userType, bio, skills, companyName, portfolioUrl } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email requis pour identifier le profil.' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        firstName,
        lastName,
        phone,
        whatsapp,
        userType,
        bio,
        skills,
        companyName,
        portfolioUrl,
      },
    });

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la mise à jour du profil' }, { status: 500 });
  }
}