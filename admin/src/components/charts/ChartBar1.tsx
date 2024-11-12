import React from "react";
import Chart from "react-apexcharts";

interface LineChartProps {
    data: any;
}
const LineChart: React.FC<LineChartProps> = ({
    data
}) => {
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "line",
            toolbar: {
                show: false,
            },
        },
        stroke: {
            curve: "smooth",
        },
        colors: ["#1E3A8A", "#38BDF8"], // màu cho các đường line
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"   
            ],
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.7,
                opacityTo: 0.3,
            },
        },
        legend: {
            position: "top",
        },
    };

    const series = [
        // {
        //     name: "Total Revenue",
        //     data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 140, 160, 170],
        // },
        {
            name: "Total Sales",
            data: [20, 30, 25, 40, 45, 55, 65, 85, data?.last.total_profit, data?.current.total_profit,0,0],
        },
    ];

    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <div className="flex justify-between">
                {/* <div>
                    <h3 className="text-blue-800 font-bold">Total Revenue</h3>
                    <p className="text-sm text-gray-500">
                        12.04.2022 - 12.05.2022
                    </p>
                </div> */}
                <div>
                    <h3 className="text-blue-300 font-bold">Total Sales</h3>
                
                </div>
            </div>
            <Chart options={options} series={series} type="line" height={320} />
            <div className="flex justify-end space-x-2 mt-2">
                {/* <button className="text-sm bg-gray-100 px-3 py-1 rounded">
                    Day
                </button>
                <button className="text-sm bg-gray-100 px-3 py-1 rounded">
                    Week
                </button> */}
                <button className="text-sm bg-gray-100 px-3 py-1 rounded">
                    Month
                </button>
            </div>
        </div>
    );
};

export default LineChart;
