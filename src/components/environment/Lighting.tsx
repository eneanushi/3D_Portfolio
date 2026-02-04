export const Lighting = () => {
  return (
    <>
      {/* Ambient Light - slightly reduced */}
      <ambientLight intensity={1.1} color="#ffffff" />

      {/* Key Light - Main directional */}
      <directionalLight
        position={[15, 25, 15]}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      {/* Fill Light */}
      <directionalLight
        position={[-15, 15, -15]}
        intensity={0.6}
        color="#ffffff"
      />

      {/* Back Light */}
      <directionalLight
        position={[0, 10, -20]}
        intensity={0.4}
        color="#ffffff"
      />

      {/* Hemisphere */}
      <hemisphereLight args={['#ffffff', '#444466', 0.6]} />

      {/* Station point lights */}
      <pointLight position={[-25, 5, 0]} intensity={1.5} color="#ffffff" distance={25} />
      <pointLight position={[0, 5, -25]} intensity={1.5} color="#ffffff" distance={25} />
      <pointLight position={[25, 5, 0]} intensity={1.5} color="#ffffff" distance={25} />
      <pointLight position={[0, 5, 15]} intensity={1.5} color="#ffffff" distance={25} />
    </>
  );
};
