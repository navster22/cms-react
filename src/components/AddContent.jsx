import { useEffect,useState } from "react";
import { useContent } from "../context/ContentContext"
import { Link, useNavigate } from "react-router-dom";
import { isNotEmpty } from "../utils/validations";

export default function AddContent() {
  const {addContent} = useContent();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('Misc');
  const [error, setError]  = useState('');
  const [showPreview, setShowPreview] = useState(false);
  
  useEffect(() => {
    const draft = localStorage.getItem('contentDraft');
    if(draft) {
      try{
        const {title, body, category} = JSON.parse(draft);
        setTitle(title || '');
        setBody(body || '');
        setCategory(category || 'Misc');
      }catch(error){
        console.error('Error in parsing draft', error)
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!isNotEmpty(title) || !isNotEmpty(body)) {
      setError('Please fill title and body for article');
      return;
    }
    const newContent = {
      id: Date.now(),
      title,
      body,
      category,
      date: new Date().toISOString()
    }
    addContent(newContent);
    setTitle('');
    setBody('');
    setCategory('Misc');
    setError('')
    localStorage.removeItem('contentDraft');
    navigate('/view')
  }



  return (
    <div>AddContent</div>
  )
}
