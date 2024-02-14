import { Card } from '@/components/ui/card';

export default function Cart() {
  return (
    <section>
      <div className="container ">
        <div className="flex min-h-[calc(100vh-184px)] items-center justify-center md:min-h-[calc(100vh-160px)]">
          <Card className="w-full max-w-[450px] p-6 shadow-md">
            <h2 className="pb-2 text-center text-3xl font-semibold tracking-tight transition-colors">
              Your Cart is empty
            </h2>
          </Card>
        </div>
      </div>
    </section>
  );
}
