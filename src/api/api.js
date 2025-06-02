export const getAIMessage = async (userQuery) => {
  console.log('first')
  try {
    const response = await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: userQuery }),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return {
      role: 'assistant',
      content: data.content,
    };
  } catch (error) {
    return {
      role: 'assistant',
      content: 'Error connecting to backend: ' + error.message,
    };
  }
};
