import React, {useState} from "react";
import Container from "../container/container";
import empty from "../../assets/png/emptyorder.png";
import CreateCategory from "../createcategory/createCategory";
export default function Categories() {
  const [isAddCategory, setAddCategory] = useState(false);

  function onClose() {
    setAddCategory(!isAddCategory);
  }

  
  return (
    <Container>
      <div className="w-full mx-auto px-2  sm:px-6 py-4 h-fit">
      <CreateCategory />

      </div>
   
    </Container>
  );
}
