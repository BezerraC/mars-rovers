namespace backend.Tests
{
    public class RoverServiceTests
    {
        private readonly RoverService _roverService;

        public RoverServiceTests()
        {
            _roverService = new RoverService(new StandardMovementStrategy());
        }

        [Fact]
        public void MoveRover_ShouldTurnLeft()
        {
            // Arrange
            var rover = new Rover { X = 1, Y = 2, Direction = 'N' };
            var plateau = new Plateau { Width = 5, Height = 5 };
            string commands = "L";

            // Act
            var result = _roverService.MoveRover(rover, plateau, commands);

            // Assert
            Assert.Equal('W', result.Direction);
        }

        [Fact]
        public void MoveRover_ShouldTurnRight()
        {
            // Arrange
            var rover = new Rover { X = 1, Y = 2, Direction = 'N' };
            var plateau = new Plateau { Width = 5, Height = 5 };
            string commands = "R";

            // Act
            var result = _roverService.MoveRover(rover, plateau, commands);

            // Assert
            Assert.Equal('E', result.Direction);
        }

        [Fact]
        public void MoveRover_ShouldMoveForward()
        {
            // Arrange
            var rover = new Rover { X = 1, Y = 2, Direction = 'N' };
            var plateau = new Plateau { Width = 5, Height = 5 };
            string commands = "M";

            // Act
            var result = _roverService.MoveRover(rover, plateau, commands);

            // Assert
            Assert.Equal(1, result.X);
            Assert.Equal(3, result.Y);
        }

        [Fact]
        public void MoveRover_ShouldNotMoveOutsidePlateau()
        {
            // Arrange
            var rover = new Rover { X = 0, Y = 0, Direction = 'S' };
            var plateau = new Plateau { Width = 5, Height = 5 };
            string commands = "M";

            // Act & Assert
            var exception = Assert.Throws<InvalidOperationException>(() => _roverService.MoveRover(rover, plateau, commands));
            Assert.Equal("Movimento inválido: Rover sairia do planalto.", exception.Message);
        }

        [Fact]
        public void MoveRover_ShouldNotMoveToOccupiedPosition()
        {
            // Arrange
            var rover1 = new Rover { X = 1, Y = 2, Direction = 'N' };
            var rover2 = new Rover { X = 1, Y = 3, Direction = 'N' };
            var plateau = new Plateau { Width = 5, Height = 5 };
            string commands = "M";

            // Add rover2 to the list of occupied positions
            _roverService.MoveRover(rover2, plateau, ""); // Rover2 occupies position (1, 3)

            // Act & Assert
            var exception = Assert.Throws<InvalidOperationException>(() => _roverService.MoveRover(rover1, plateau, commands));
            Assert.Equal("Movimento inválido: Posição já ocupada por outra sonda.", exception.Message);
        }
    }
}