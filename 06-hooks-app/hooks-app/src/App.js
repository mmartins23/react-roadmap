import CounterApp from "./components/01-useState/CounterApp";
import CounterWithCustomHook from "./components/01-useState/CounterWithCustomHook";
import FormWithCustomHook from "./components/02-useEffect/FormWithCustomHook";
import SimpleForm from "./components/02-useEffect/SimpleForm";
import MultipleCustomHooks from "./components/03-example/MultipleCustomHooks";
import { FocusScreen } from "./components/04-useRef/FocusScreen";
import UseMemoExample from "./components/05-useMemo/useMemoExample";
import UseCallbackExample from "./components/06-useCallback/UseCallbackExample";

function App() {
  return (
    <div>
      <CounterApp />
      <hr/>
      <CounterWithCustomHook/>
      <hr/>
      <SimpleForm/>
      <hr/>
      <FormWithCustomHook/>
      <hr/>
      <MultipleCustomHooks/>
      <hr/>
      <FocusScreen/>
      <hr/>
      <UseMemoExample/>
      <hr/>
      <UseCallbackExample/>
    </div>
  );
}

export default App;
