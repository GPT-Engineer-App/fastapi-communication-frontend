import React, { useState } from "react";
import { Container, Text, VStack, Button, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { FaRocket } from "react-icons/fa";

const Index = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/data"); // FastAPIのエンドポイント
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">FastAPIと通信するReactアプリ</Text>
        <Button leftIcon={<FaRocket />} colorScheme="teal" size="lg" onClick={fetchData} isLoading={loading}>
          データを取得
        </Button>
        {loading && <Spinner />}
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {data && <Text>{JSON.stringify(data)}</Text>}
      </VStack>
    </Container>
  );
};

export default Index;
