import { Text, Alert, Image, Clear } from './Basic.jsx';
import Button from './Button.jsx';
import Options from './Options.jsx';
import { Height, Weight } from './Ruler.jsx';
import Field from './Field.jsx';
import Loading from './Loading.jsx';
import Quotes from './Quotes.jsx';
import { Charts, Chart } from './Charts.jsx';
import Compare from './Compare.jsx';
import Price from './Price.jsx';
import Results from './Results.jsx';

// Um componente por "type" de layer do quiz.json. Tipo novo = componente novo + uma linha aqui.
export default { text: Text, alert: Alert, image: Image, clear: Clear, button: Button, options: Options, height: Height, weight: Weight, field: Field, loading: Loading, quotes: Quotes, charts: Charts, chart: Chart, compare: Compare, price: Price, results: Results };
