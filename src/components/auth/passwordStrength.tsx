import { calculatePasswordStrength } from '../../lib/passwordStrength';

interface PasswordStrengthMeterProps {
  password: string;
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const { score, feedback } = calculatePasswordStrength(password);
  
  const getStrengthColor = () => {
    switch (score) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-green-400';
      case 5:
        return 'bg-green-500';
      default:
        return 'bg-gray-200';
    }
  };

  const getStrengthText = () => {
    switch (score) {
      case 0:
      case 1:
        return 'Very Weak';
      case 2:
      case 3:
        return 'Moderate';
      case 4:
        return 'Strong';
      case 5:
        return 'Very Strong';
      default:
        return 'No Password';
    }
  };

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1 h-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-full w-full rounded-full transition-colors duration-200 ${
              i < score ? getStrengthColor() : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className={`font-medium ${score > 3 ? 'text-green-500' : score > 1 ? 'text-yellow-500' : 'text-red-500'}`}>
          {getStrengthText()}
        </span>
        {feedback.length > 0 && (
          <span className="text-gray-500 dark:text-gray-400 text-xs">
            {feedback[0]}
          </span>
        )}
      </div>
    </div>
  );
}