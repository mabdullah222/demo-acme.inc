import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";



const monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const view = searchParams.get("view");

    let rawData:any = [];

    switch (view) {
      case "Yearly": {
        rawData = await prisma.sale.aggregateRaw({
          pipeline: [
            {
              $group: {
                _id: { $year: "$saleDate" },
                totalAmount: { $sum: "$totalAmount" },
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
          ],
        });
        rawData = rawData.map((d:any)=> ({
          name: String(d._id),
          value: d.totalAmount,
        }));
        break;
      }

      case "Monthly": {
      const presentYear = new Date().getFullYear();

      rawData = await prisma.sale.aggregateRaw({
        pipeline: [
          {
            $match: {
              year: presentYear,
              month: { $ne: null }
            }
          },
          {
            $group: {
              _id: "$month",
              totalAmount: { $sum: "$totalAmount" },
              count: { $sum: 1 },
            }
          },
          {
            $sort: { _id: 1 }
          }
        ],
  });
  rawData = rawData.map((d: any) => ({
    name: monthShort[d._id - 1],
    value: d.totalAmount,
  }));

  break;
}

      case "Daily": {
        const today = new Date();
        const currentDay = today.getDay();
        const currentMonth = today.getMonth() + 1;
        const currentYear = today.getFullYear();

        rawData = await prisma.sale.aggregateRaw({
          pipeline: [
            {
              $match: {
                day: { $lte: currentDay },
                month: currentMonth,
                year: currentYear,
              }
            },
            {
              $group: {
                _id: "$day",
                totalAmount: { $sum: "$totalAmount" },
                count: { $sum: 1 },
              }
            },
            {
              $sort: { _id: 1 }
            }
          ]
        });
        rawData = rawData.map((d: any) => {
        const date = new Date(`${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(d._id).padStart(2, '0')}`);
        const dayLabel = date.toLocaleDateString("en-US", { weekday: "short" });
        return {
          name: dayLabel,
          value: d.totalAmount
        };
      });
        break;
      }

      default:
        return NextResponse.json(
          { message: "Invalid view. Use 'Yearly', 'Monthly', or 'Daily'." },
          { status: 400 }
        );
    }
    return NextResponse.json({ view, data: rawData }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error(message);
    return NextResponse.json({ message: "Error while retrieving the analytics" }, { status: 500 });
  }
}
