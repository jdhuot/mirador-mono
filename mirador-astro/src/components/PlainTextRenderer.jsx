export default function PortableTextToPlain(content) {
  // Filter only 'block' types and extract text
  const plainText = content
    .filter(block => block._type === 'block' && block.children)
    .map(block => block.children.map(child => child.text).join(''))
    .join(' '); // Join paragraphs with spaces (adjust if you want \n or double line breaks)

  return plainText;
}