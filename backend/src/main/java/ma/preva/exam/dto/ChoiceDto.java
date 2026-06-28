package ma.preva.exam.dto;

import ma.preva.exam.choice.Choice;

public record ChoiceDto(
        Long id,
        String text,
        Boolean isCorrect,
        int order
) {
    public static ChoiceDto from(Choice c, boolean showCorrect) {
        return new ChoiceDto(c.getId(), c.getText(), showCorrect ? c.isCorrect() : null, c.getOrderIndex());
    }
}
