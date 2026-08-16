import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const roles=["SUPER_ADMIN","HALL_ADMIN","STAFF"];
export async function GET(){const s=await auth();if(!s?.user||!roles.includes(s.user.role))return NextResponse.json({error:"Forbidden"},{status:403});const students=await prisma.student.findMany({orderBy:{studentId:"asc"},include:{user:true,hall:true,allocations:{where:{isActive:true},include:{room:true,seat:true}}}});return NextResponse.json(students)}
export async function PATCH(req:Request){const s=await auth();if(!s?.user||!roles.includes(s.user.role))return NextResponse.json({error:"Forbidden"},{status:403});const b=await req.json();if(!b.id)return NextResponse.json({error:"Student id is required"},{status:400});const student=await prisma.student.update({where:{id:b.id},data:{hallId:b.hallId||null,phone:b.phone??undefined},include:{user:true,hall:true}});if(typeof b.active==="boolean")await prisma.user.update({where:{id:student.userId},data:{isActive:b.active}});return NextResponse.json(student)}
