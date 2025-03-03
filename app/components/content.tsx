"use client";
import { useState, useEffect } from 'react';
import { Responsable } from '../interfaces';

export default function Content({page}: {page: string}) {
  const [resData, setResData] = useState<Responsable[]>([]);
  const [selectedRes, setSelectedRes] = useState<Responsable>();
  const [titleText, setTitleText] = useState<string>('');

  const labelText = page === 'responsable' ? 'Seleccione un responsable:' : 'Seleccione un ID responsable:';

  // Función asíncrona para obtener datos del Web Service
  async function getData(url: string): Promise<Responsable[] | null> {
    const API_KEY = process.env.API_KEY;
    const API_URL = process.env.API_URL;
    try {
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': API_KEY
        }
      });
      if (!response.ok && response.status === 404) {
        throw new Error('Not found (status code 404)');
      } else if (!response.ok && response.status === 401) {
        throw new Error('Unauthorized (status code 401)');
      }
      const data: Responsable[] = await response.json();
      setTitleText(page === 'responsable' ? 'Responsable' : 'ID Responsable');
      return data;
    } catch (err) {
      setTitleText(`${err}`);
      console.error('Fetching data:', err);
      return null;
    }
  }

  // Llama a la función getData(), actualiza el estado resData y selecciona el primer elemento al cargar la página
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('responsables');
      if (data) {
        setResData(data);
        setSelectedRes(data[0]);
      }
    };
    fetchData();
  }, [page]);

  // Función para manejar el cambio de selección del dropdown
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selected = resData.find(res => res.id === selectedId);
    setSelectedRes(selected);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight max-w-xl mx-auto text-gray-900">{titleText}</h1>
      {(titleText === 'Responsable' || titleText === 'ID Responsable') && 
      <form className="max-w-xl mx-auto mt-4">
        <label
          htmlFor="responsables"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {labelText}
        </label>
        <select
          id="responsables"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleSelectChange}
        >
          {resData.map((item, index) => (
            <option value={item.id} key={index}>{page === 'responsable' ? item.name : item.id}</option>
          ))}
        </select>
        <br />
        <div>
          {page === 'responsable' ?
            <p><strong>IDResponsable: </strong>{selectedRes ? selectedRes.id : ''}</p> :
            <p><strong>Responsable: </strong>{selectedRes ? selectedRes.name : ''}</p>}
          <p><strong>Correo: </strong>{selectedRes ? selectedRes.email : ''}</p>
          <p><strong>IDCategoria: </strong>{selectedRes ? selectedRes.categoryId : ''}</p>
          <p><strong>IDTipo: </strong>{selectedRes ? selectedRes.typeId : ''}</p>
          <p><strong>Puesto: </strong>{selectedRes ? selectedRes.position : ''}</p>
          <p><strong>Telefono: </strong>{selectedRes ? selectedRes.phone : ''}</p>
        </div>
      </form>}
    </div>
  );
}