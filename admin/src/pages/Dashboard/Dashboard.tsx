//components
import {
    AiOutlineEye,
    AiOutlineShoppingCart,
    AiOutlineShopping,
    AiOutlineUser,
} from "react-icons/ai";
import CardNumber from "../../components/charts/Chart1";
import LineChart from "../../components/charts/ChartBar1";
import BarChart from "../../components/charts/ChartBar2";
import { GetChartData } from "../../utils/Chart/chart.util";
import { useQuery } from "@tanstack/react-query";

export default function DashBoard() {
    const { data } = useQuery({
        queryKey: ["total"],
        queryFn: GetChartData,
    });

    return (
        <div className="w-full h-screen gap-5 bg-main-bg col-span-5 row-span-2 flex flex-col justify-between items-center  p-[30px] ">
            <div className="grid grid-cols-4 grid-rows-1 gap-4 w-full h-[30%]">
                <CardNumber
                    title="Total Views"
                    number={data?.current.total_view}
                    change={
                        data?.last.total_view
                            ? (data?.current.total_view /
                                  data?.last.total_view -
                                  1) *
                              100
                            : 0
                    }
                    changeType={
                        data?.current.total_view > data?.last.total_view
                            ? "up"
                            : "down"
                    }
                    icon={<AiOutlineEye size={30} className="text-blue-700 " />}
                />
                <CardNumber
                    title="Total Sales"
                    number={data?.current.total_profit}
                    change={
                        data?.last.total_profit
                            ? (data?.current.total_profit /
                                  data?.last.total_profit -
                                  1) *
                              100
                            : 0
                    }
                    changeType={
                        data?.current.total_profit > data?.last.total_profit
                            ? "up"
                            : "down"
                    }
                    icon={
                        <AiOutlineShoppingCart
                            size={30}
                            className="text-blue-700 "
                        />
                    }
                />
                <CardNumber
                    title="Total Orders"
                    number={data?.current.total_order}
                    change={
                        data?.last.total_order
                            ? (data?.current.total_order /
                                  data?.last.total_order -
                                  1) *
                              100
                            : 0
                    }
                    changeType={
                        data?.current.total_order > data?.last.total_order
                            ? "up"
                            : "down"
                    }
                    icon={
                        <AiOutlineShopping
                            size={30}
                            className="text-blue-700 "
                        />
                    }
                />
                <CardNumber
                    title="Total Users"
                    number={data?.current.total_user}
                    change={
                        data?.last.total_user
                            ? (data?.current.total_user /
                                  data?.last.total_user -
                                  1) *
                              100
                            : 0
                    }
                    changeType={
                        data?.current.total_user > data?.last.total_user
                            ? "up"
                            : "down"
                    }
                    icon={
                        <AiOutlineUser size={30} className="text-blue-700 " />
                    }
                />
            </div>
            {data && (
                <div className="grid grid-cols-1 lg:grid-cols-2  grid-rows-1 gap-4  w-full h-[70%]">
                    <LineChart data={data} />
                    <BarChart data={data} />
                </div>
            )}
        </div>
    );
}
