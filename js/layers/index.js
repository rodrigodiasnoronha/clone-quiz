import { text, image, clear, alert, button } from './basic.js';
import { options } from './options.js';
import { height, weight } from './ruler.js';
import { field } from './field.js';
import { loading } from './loading.js';
import { quotes } from './quotes.js';
import { charts, chart } from './charts.js';
import { compare } from './compare.js';
import { price } from './price.js';
import { results } from './results.js';

// Um renderer por "type" de layer do quiz.json: (layer, ctx) => HTMLElement
export const layers = { text, image, clear, alert, button, options, height, weight, field, loading, quotes, charts, chart, compare, price, results };
