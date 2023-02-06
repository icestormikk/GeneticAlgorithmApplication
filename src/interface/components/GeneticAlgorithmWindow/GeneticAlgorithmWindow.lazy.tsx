import React, {lazy, Suspense} from 'react';

const LazyGeneticAlgorithmWindow = lazy(
    () => import('./GeneticAlgorithmWindow'),
);

interface GeneticAlgorithmWindowProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const GeneticAlgorithmWindow = (
    props: JSX.IntrinsicAttributes & GeneticAlgorithmWindowProps,
) => (
  <Suspense fallback={null}>
    <LazyGeneticAlgorithmWindow {...props} />
  </Suspense>
);

export default GeneticAlgorithmWindow;
