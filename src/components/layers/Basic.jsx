import Rich from '../Rich.jsx';
import Media from '../Media.jsx';
import { bracket } from '../../lib/text.js';

export const Text = ({ content }) => <Rich html={content.text} />;

export const Alert = ({ content, design }) => <Rich html={content.text} className={`alert ${design.style || 'info'}`} />;

export const Image = ({ content }) => <Media src={content.image.src} style={{ margin: '0 auto' }} />;

export const Clear = ({ content }) => <div style={{ height: bracket(content.clear) || '1rem' }} />;
