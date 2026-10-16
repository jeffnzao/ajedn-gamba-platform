import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, amount, month, receiptRef } = body;

    const newContribution = await prisma.contribution.create({
      data: {
        userId,
        amount: amount || 5000,
        month,
        paid: true,
        paymentDate: new Date(),
        receiptRef: receiptRef || `REC-${Date.now()}`,
      },
    });

    // Mettre à jour le statut du membre à A_JOUR si besoin
    await prisma.user.update({
      where: { id: userId },
      data: { statutCotiz: 'A_JOUR' },
    });

    return NextResponse.json({ success: true, data: newContribution });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de l’enregistrement de la cotisation' }, { status: 400 });
  }
}