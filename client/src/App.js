import Window from "./components/Window/Window";
import RootStore from "./stores/RootStore";

import "./App.css";

const rootStore = new RootStore();
const bookStore = rootStore.bookStore;
const userStore = rootStore.userStore;

function App() {
    return (
        <div className="App">
            <h2>Librarian</h2>
            <div className="widows">
                <Window store={bookStore} />
                <Window store={userStore} />
            </div>
        </div>
    );
}

export default App;
