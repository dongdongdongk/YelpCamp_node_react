import Alert from 'react-bootstrap/Alert';

function AdditionalContent() {
  return (
    <Alert variant="danger">
      <Alert.Heading>Error!!</Alert.Heading>
      <p>
        페이지가 없습니다
      </p>
      <hr />
      <p className="mb-0">
        Whenever you need to, be sure to use margin utilities to keep things
        nice and tidy.
      </p>
    </Alert>
  );
}

export default AdditionalContent;