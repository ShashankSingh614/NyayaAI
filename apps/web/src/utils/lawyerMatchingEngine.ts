import { Lawyer, lawyersData } from "@/data/lawyers";

interface LawyerMatch {
  lawyer: Lawyer;
  matchScore: number;
  relevantSkills: string[];
}

export const findRecommendedLawyers = (query: string): LawyerMatch[] => {
  const queryLower = query.toLowerCase();
  const keywords = queryLower.split(/\s+/).filter(k => k.length > 0);

  const matchedLawyers = lawyersData.map((lawyer) => {
    let score = 0;
    const relevantSkills: string[] = [];

    // Check specialization matches
    const specialization = lawyer.specialization.toLowerCase();
    keywords.forEach(keyword => {
      if (specialization.includes(keyword)) {
        score += 30;
        if (!relevantSkills.includes(lawyer.specialization)) {
          relevantSkills.push(lawyer.specialization);
        }
      }
    });

    // Check description matches
    const description = lawyer.description.toLowerCase();
    keywords.forEach(keyword => {
      if (description.includes(keyword)) {
        score += 10;
      }
    });

    // Check badges (expertise markers)
    lawyer.badges.forEach(badge => {
      if (keywords.some(k => badge.toLowerCase().includes(k))) {
        score += 20;
        if (!relevantSkills.includes(badge)) {
          relevantSkills.push(badge);
        }
      }
    });

    // Boost score based on rating
    score += lawyer.rating * 5;

    // Experience bonus
    if (lawyer.experience >= 10) {
      score += 15;
    } else if (lawyer.experience >= 5) {
      score += 10;
    }

    return {
      lawyer,
      matchScore: score,
      relevantSkills,
    };
  });

  // Filter lawyers with matching scores and sort by score
  return matchedLawyers
    .filter(m => m.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3); // Return top 3 recommendations
};

export const getLawyersBySpecialization = (specialization: string): Lawyer[] => {
  return lawyersData.filter(
    lawyer => lawyer.specialization.toLowerCase().includes(specialization.toLowerCase())
  );
};

export const getLawyersByLocation = (location: string): Lawyer[] => {
  return lawyersData.filter(
    lawyer => 
      lawyer.city.toLowerCase().includes(location.toLowerCase()) ||
      lawyer.state.toLowerCase().includes(location.toLowerCase())
  );
};
