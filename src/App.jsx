import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import "./App.css";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div>
      <h1>Phonebook</h1>
      <div className="form-container">
        <ContactForm />
        <SearchBox />
      </div>
      <ContactList />
      <Toaster position="top-right" />
    </div>
  );
}
