import { Suspense } from "react";
import OrderSuccess from "./OrderSuccess";

export default function Page() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <OrderSuccess />
    </Suspense>
  );
}
