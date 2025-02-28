"use client";
import { useState, useEffect } from 'react';
import { Responsable } from '../interfaces';

export default function Content({page}: {page: string}) {
  const [resData, setResData] = useState<Responsable[]>([]);
  const [selectedRes, setSelectedRes] = useState<Responsable>();
  const titleText = page === 'responsable' ? 'Responsable' : 'ID Responsable';
  const labelText = page === 'responsable' ? 'Seleccione un responsable:' : 'Seleccione un ID responsable:';

  const apiBaseUrl = 'https://prueba-tecnica-responsables.vercel.app:3001/';

  // Función asíncrona para obtener datos del Web Service
  async function getData(url: string): Promise<Responsable[] | null> {
    try {
      const response = await fetch(`${apiBaseUrl}${url}`);
      if (!response.ok && response.status === 404) {
        throw new Error('Error: not found (status code 404)');
      }
      const data: Responsable[] = await response.json();
      return data;
    } catch (err) {
      console.error('Error fetching data:', err);
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
    const selected = resData.find(res => res.IDResponsable === selectedId);
    setSelectedRes(selected);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight max-w-xl mx-auto text-gray-900">{titleText}</h1>
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
            <option value={item.IDResponsable} key={index}>{page === 'responsable' ? item.Responsable : item.IDResponsable}</option>
          ))}
        </select>
        <br />
        <div>
          {page === 'responsable' ?
            <p><strong>IDResponsable: </strong>{selectedRes ? selectedRes.IDResponsable : ''}</p> :
            <p><strong>Responsable: </strong>{selectedRes ? selectedRes.Responsable : ''}</p>}
          <p><strong>Correo: </strong>{selectedRes ? selectedRes.Correo : ''}</p>
          <p><strong>IDCategoria: </strong>{selectedRes ? selectedRes.IDCategoria : ''}</p>
          <p><strong>IDTipo: </strong>{selectedRes ? selectedRes.IDTipo : ''}</p>
          <p><strong>Puesto: </strong>{selectedRes ? selectedRes.Puesto : ''}</p>
          <p><strong>Telefono: </strong>{selectedRes ? selectedRes.Telefono : ''}</p>
        </div>
      </form>

    </div>
  );
}