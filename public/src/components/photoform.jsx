const PhotoForm = ({addPhoto}) => {
  let photo;
  let name;
  let desc;

  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        addPhoto(photo.value, name.value, desc.value);
        input.value = '';
      }}>
      <input ref={node => {
        photo = node;
      }}/>
      <input ref={node2 => {
        name = node2;
      }}/>
      <input ref={node3 => {
        desc = node3;
      }}/>
      <br />
    </form>
  );
};

window.PhotoForm = PhotoForm;
