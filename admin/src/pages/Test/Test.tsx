import Test1 from "./components/Test1";
import { TranslationProvider } from "./translateContext";
interface TestProps {}
const Test: React.FC<TestProps> = ({}) => {
    return (
        <div>
            <TranslationProvider>
                <Test1/>
            </TranslationProvider>
        </div>
    );
};
export default Test;
