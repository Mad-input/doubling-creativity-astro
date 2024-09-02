
const MAX_FILE_SIZE = 2 * 1024 * 1024;
export default function SetImage({ userImage, setUserImage, setError }) {

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 300; // Ancho máximo deseado
          const maxHeight = 300; // Alto máximo deseado

          let width = img.width;
          let height = img.height;

          // Mantener la relación de aspecto
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convertir la imagen redimensionada a base64
          resolve(canvas.toDataURL(file.type));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // Verifica el tamaño del archivo
    if (file && file.size > MAX_FILE_SIZE) {
      setError('El tamaño de la imagen es demasiado grande. El máximo es 2MB.');
      return;
    } else {
      setError('');
    }

    if (file) {
      const resizedImage = await resizeImage(file)
      setUserImage(resizedImage)
    }
  };

  return (
    <div className="image-user-cotainer">
      <label>
        <span>Seleccione una Imagen de Perfil</span>
        <input type="file" accept='img/*' className='input-file-user' onChange={handleImageChange} />
        <div className="preview-image">
          <img src={userImage} />
        </div>
      </label>
    </div>
  )
}
