import { PrismaClient } from '@prisma/client'

//ini untuk supaya tidak overload saat interaksi dengan beck end

//script ini untuk agar program kita tidak mudah lelah


let prisma;

if(process.env.NODE.ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

export default prisma;
