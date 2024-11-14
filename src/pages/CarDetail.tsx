import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Edit, Trash2, ChevronLeft } from 'lucide-react';
import { getCar, deleteCar } from '../lib/api';
import Button from '../components/Button';

export default function CarDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: car, isLoading } = useQuery({
    queryKey: ['car', id],
    queryFn: () => getCar(id!),
  });

  const deleteCarMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      toast.success('Car deleted successfully!');
      navigate('/');
    },
    onError: () => {
      toast.error('Failed to delete car. Please try again.');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!car) return <div>Car not found</div>;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      await deleteCarMutation.mutateAsync(id!);
    }
  };

  return (
    <div>
      <Link to="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
        <ChevronLeft className="h-5 w-5" />
        <span>Back to Cars</span>
      </Link>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="relative aspect-w-16 aspect-h-9 rounded-t-lg overflow-hidden">
          <img
            src={car.images[currentImageIndex] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500'}
            alt={car.title}
            className="object-cover w-full h-full"
          />
          {car.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {car.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{car.title}</h1>
            <div className="flex space-x-2">
              <Link to={`/cars/${id}/edit`}>
                <Button variant="secondary" className="flex items-center space-x-2">
                  <Edit className="h-5 w-5" />
                  <span>Edit</span>
                </Button>
              </Link>
              <Button
                variant="danger"
                onClick={handleDelete}
                className="flex items-center space-x-2"
              >
                <Trash2 className="h-5 w-5" />
                <span>Delete</span>
              </Button>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{car.description}</p>

          <div className="flex flex-wrap gap-2">
            {car.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}