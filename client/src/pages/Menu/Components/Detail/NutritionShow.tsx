import { INutrition } from "../../../../types/INutrition";

interface NutritionShowProps {
    data: INutrition;
}
const NutritionShow: React.FC<NutritionShowProps> = ({ data }) => {
    return (
        <>
            {data && (
                <>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b p-2">Nutrient</th>
                                <th className="border-b p-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.calories && (
                                <tr>
                                    <td className="border-b p-2">Calories</td>
                                    <td className="border-b p-2">
                                        {data.calories}
                                    </td>
                                </tr>
                            )}
                            {data.carbs && (
                                <tr>
                                    <td className="border-b p-2">Carbs</td>
                                    <td className="border-b p-2">
                                        {data.carbs}
                                    </td>
                                </tr>
                            )}
                            {data.fats && (
                                <tr>
                                    <td className="border-b p-2">Fats</td>
                                    <td className="border-b p-2">
                                        {data.fats}
                                    </td>
                                </tr>
                            )}
                            {data.proteins && (
                                <tr>
                                    <td className="border-b p-2">Proteins</td>
                                    <td className="border-b p-2">
                                        {data.proteins}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
};
export default NutritionShow;
