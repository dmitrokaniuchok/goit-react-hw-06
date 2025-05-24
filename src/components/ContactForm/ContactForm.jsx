import css from "./ContactForm.module.css";
import { MdPerson, MdPhone } from "react-icons/md";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { selectContacts } from "../../redux/contactsSlice";
import { toast } from "react-hot-toast";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be 50 characters or less")
    .required("Required"),
  number: Yup.string()
    .min(7, "Number must be at least 7 digits")
    .max(15, "Number must be 15 digits or less")
    .matches(/^\d+$/, "Only numbers can be entered")
    .required("Required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, actions) => {
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isDuplicate) {
      toast.error(`${values.name} is already in contacts.`);
      actions.resetForm();
      return;
    }

    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    dispatch(addContact(newContact));
    toast.success(`${values.name} added to contacts!`);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <div className={css.labelRow}>
            Name <MdPerson className={css.icon} />
          </div>
          <Field className={css.input} type="text" name="name" />
          <ErrorMessage component="div" className={css.error} name="name" />
        </label>

        <label className={css.label}>
          <div className={css.labelRow}>
            Number <MdPhone className={css.icon} />
          </div>
          <Field className={css.input} type="tel" name="number" />
          <ErrorMessage component="div" className={css.error} name="number" />
        </label>

        <button className={css.button} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
}
