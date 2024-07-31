import CardioLoader from "../../components/CardioLoader";
import Dashboard from "../../components/Dashboard/Dashboard";
import Questionnaire from "../../components/Questionnaire/Questionnaire";

export default function Page() {

  return (
    <>
      <h1>Home</h1>
      <CardioLoader />
      <Dashboard />
      <Questionnaire />
    </>
  );
}