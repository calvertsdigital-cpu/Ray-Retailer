import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tea-coffee/coffee')({
  component: CoffeeCollection,
});

function CoffeeCollection() {
  return (
    <div className="coffee-collection">
      <h1>Coffee Collection</h1>
      <p>Coming soon - Coffee products</p>
    </div>
  );
}
