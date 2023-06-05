
import dynamic from "next/dynamic";

//export default GaugeComponent;

export default function Gauge() {
    const GaugeComponent = dynamic(() => import("react-gauge-component"), {ssr: false});
    return <GaugeComponent />
}