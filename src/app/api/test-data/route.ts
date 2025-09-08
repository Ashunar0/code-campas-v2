import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export const testData = [
  {
    name: "小林楓",
    email: "kaede.kobayashi@example.com",
    period: 73,
    status: "approved",
    permission: "student",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "佐藤陽奈",
    email: "hina.sato@example.com",
    period: 73,
    status: "approved",
    permission: "student",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "藤田奈緒",
    email: "nao.fujita@example.com",
    period: 73,
    status: "approved",
    permission: "student",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "山田花",
    email: "hana.yamada@example.com",
    period: 73,
    status: "approved",
    permission: "student",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "田口一郎",
    email: "ichiro.taguchi@example.com",
    period: 74,
    status: "approved",
    permission: "student",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "斎藤美咲",
    email: "misaki.saito@example.com",
    period: 73,
    status: "approved",
    permission: "student",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "中村大輝",
    email: "daiki.nakamura@example.com",
    period: 73,
    status: "approved",
    permission: "student",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "山本和真",
    email: "kazuma.yamamoto@example.com",
    period: 73,
    status: "approved",
    permission: "student",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "小林太郎",
    email: "taro.kobayashi@example.com",
    period: 73,
    status: "approved",
    permission: "student",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function GET() {
  await Promise.all(
    testData.map((doc) => addDoc(collection(db, "users"), doc))
  );
  return new Response(JSON.stringify({ message: "追加完了" }), {
    headers: { "Content-Type": "application/json" },
  });
}
