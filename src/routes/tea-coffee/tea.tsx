import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tea-coffee/tea')({
  component: TeaCollection,
});

function TeaCollection() {
  return (
    <div className="tea-collection">
      <h1>Tea Collection</h1>
      <p>Coming soon - Tea products</p>
    </div>
  );
}
