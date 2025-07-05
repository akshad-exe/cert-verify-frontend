import {
    Award,
    Book,
    Briefcase,
    Heart,
    Trophy
} from 'lucide-react';

/**
 * Get the appropriate icon for a certificate type
 * @param type - The certificate type
 * @param size - Icon size class (default: "h-4 w-4")
 * @param color - Icon color class (default: "text-orange-500")
 * @returns JSX element with the appropriate icon
 */
export const getCertificateTypeIcon = (
    type: string, 
    size: string = "h-4 w-4", 
    color: string = "text-orange-500"
) => {
    const iconClass = `${size} ${color}`;
    
    switch (type) {
        case 'internship':
            return <Briefcase className={iconClass} />;
        case 'course':
            return <Book className={iconClass} />;
        case 'appreciation':
            return <Heart className={iconClass} />;
        case 'workshop':
            return <Trophy className={iconClass} />;
        default:
            return <Award className={iconClass} />;
    }
};

/**
 * Get a formatted label for a certificate type
 * @param type - The certificate type
 * @returns Formatted label string
 */
export const getCertificateTypeLabel = (type: string): string => {
    if (!type || typeof type !== 'string') return 'Unknown';
    return type.charAt(0).toUpperCase() + type.slice(1);
};

/**
 * Format date to a readable format
 * @param dateString - Date string to format
 * @param format - Format type ('short' | 'long')
 * @returns Formatted date string
 */
export const formatCertificateDate = (dateString: string, format: 'short' | 'long' = 'short'): string => {
    if (!dateString) return 'N/A';
    
    try {
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        
        if (format === 'long') {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
    }
}; 