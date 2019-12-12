import { Journey_Template_Response_V1, Level } from 'superfitjs'

export default class TemplateUtils {
  static experienceLevelText(journey: Journey_Template_Response_V1): string {
    switch (journey.level.toLowerCase()) {
      case Level.Beginner:
        return "Perfect for all fitness levels"
      case Level.Intermediate:
        return "Some training experience preferred"
      case Level.Advanced:
        return "Advanced fitness experience preferred"
      case Level.Pro:
        return "Advanced movement and strength experience required"
      default:
        return "Some training experience preferred"
    }
  }

  static trainingPlanTemplateTotalWeeks(template: Journey_Template_Response_V1): number {
    return template.phases.map(x => x.numberOfWeeks).reduce((a, b) => a + b)
  }
}