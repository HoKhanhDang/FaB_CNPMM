import { useTranslation } from "../translateContext";

interface TestProps {}
const Test: React.FC<TestProps> = ({}) => {
    const { translate } = useTranslation();
    return (
        <div>
            <h1>{translate("Title")}</h1>
            {/* Add other components here */}
        </div>
    );
};
export default Test;
