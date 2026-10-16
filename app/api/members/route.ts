import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const members = await prisma.user.findMany();
    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la récupération des membres' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email }
    });

    if (existingUser) {
      return NextResponse.json({ success: false, error: 'Cet email est déjà enregistré.' }, { status: 400 });
    }

    const newMember = await prisma.user.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        whatsapp: body.whatsapp,
        residence: body.residence || 'Gamba',
        isDiaspora: body.isDiaspora || false,
        bio: body.bio || '',
      },
    });
    
    return NextResponse.json({ success: true, data: newMember });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la création du membre' }, { status: 400 });
  }
}