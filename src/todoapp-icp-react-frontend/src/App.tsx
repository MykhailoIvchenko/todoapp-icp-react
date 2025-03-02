import CheckAccess from './components/CheckAccess';
import FallBackPage from './components/FallbackPage';
import DefaultPageLayout from './components/ui/DefaultPageLayout';

function App() {
  return (
    <DefaultPageLayout>
      <CheckAccess />
    </DefaultPageLayout>
  );
}

export default App;
