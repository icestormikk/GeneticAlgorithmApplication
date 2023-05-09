import React from 'react';
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import {useAppSelector} from "../../redux/hooks";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

/**
 * StatisticsChart
 * @constructor
 */
function StatisticsChart() {
    const stepsInfo = useAppSelector((state) => state.graph.algorithmStepsInfo)
    const [isShown, setIsShown] = React.useState(false)

    const options = React.useMemo(
        () => {
            return {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top' as const,
                    },
                    title: {
                        display: true,
                        text: 'Минимальное найдённое расстояние в зависимости от поколения',
                    },
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Номер поколения',
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Минимальное расстояние',
                        }
                    }
                }
            };
        },
        []
    )
    const refactoredData = React.useMemo(
        () => {
            return {
                labels: stepsInfo.map((info) => info.generationNumber),
                datasets: [
                    {
                        label: 'Минимальное расстояние',
                        data: stepsInfo.map((info) => info.distance),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                ],
            }
        },
        [stepsInfo]
    )

    return (
        <div
            className="centered"
            data-testid="StatisticsChart"
        >
            {
                (stepsInfo.length > 0 && isShown) ? (
                    <Line
                        options={options}
                        data={refactoredData}
                        style={{
                            height: '40rem'
                        }}
                    />
                ) : (
                    <button
                        type="button"
                        className="submit-button w-2/3 bg-green-600/60"
                        onClick={() => setIsShown(true)}
                    >
                        Нарисовать график
                    </button>
                )
            }
        </div>
    );
}

export default StatisticsChart;
