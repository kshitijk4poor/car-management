import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';
import { getCars } from '../lib/api';
import Button from '../components/Button';
import Input from '../components/Input';
import ImageCarousel from '../components/ImageCarousel';

export default function CarList() {
  const [search, setSearch] = useState('');
  const { data: cars, isLoading } = useQuery({
    queryKey: ['cars', search],
    queryFn: () => getCars(search),
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Cars</h1>
        <Link to="/cars/new">
          <Button className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add New Car</span>
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search cars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
          icon={<Search className="h-5 w-5 text-gray-400" />}
        />
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : cars?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No cars found. Add your first car!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars?.map((car: any) => (
            <Link
              key={car.id}
              to={`/cars/${car.id}`}
              className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <ImageCarousel images={car.images} title={car.title} />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{car.title}</h2>
                <p className="text-gray-600 line-clamp-2">{car.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {car.tags.map((tag: any) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}