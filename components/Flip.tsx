import { Text } from "@chakra-ui/react";
import Tick from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";
import { useEffect, useRef } from "react";

type Props = {
  text: string;
};

const Flip: React.FC<Props> = ({ text }) => {
  const divRef = useRef(null);
  const tickRef = useRef(null);
  useEffect(() => {
    const didInit = (tick: any) => {
      tickRef.current = tick;
    };

    const currDiv = divRef.current;
    const tickValue = tickRef.current;
    Tick.DOM.create(currDiv, {
      text,
      didInit,
    });
    return () => Tick.DOM.destroy(tickValue);
  });

  useEffect(() => {
    if (tickRef.current) {
      (tickRef.current as any).value = text;
    }
  }, [text]);

  return (
    <div ref={divRef} className="tick">
      <div data-repeat="true">
        <Text
          as="span"
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
          fontWeight="bold"
          borderRadius="none"
          marginY={1}
          marginX={0}
          data-view="flip"
        ></Text>
      </div>
    </div>
  );
};

export default Flip;
