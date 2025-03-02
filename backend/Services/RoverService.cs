// Commands interface
public interface ICommand
{
    void Execute(Rover rover, Plateau plateau, List<(int X, int Y)> occupiedPositions);
}

// Command to turn left
public class TurnLeftCommand : ICommand
{
    public void Execute(Rover rover, Plateau plateau, List<(int X, int Y)> occupiedPositions)
    {
        rover.Direction = rover.Direction switch
        {
            'N' => 'W',
            'W' => 'S',
            'S' => 'E',
            'E' => 'N',
            _ => rover.Direction
        };
    }
}

// Command to turn right
public class TurnRightCommand : ICommand
{
    public void Execute(Rover rover, Plateau plateau, List<(int X, int Y)> occupiedPositions)
    {
        rover.Direction = rover.Direction switch
        {
            'N' => 'E',
            'E' => 'S',
            'S' => 'W',
            'W' => 'N',
            _ => rover.Direction
        };
    }
}

// Command to move forward
public class MoveForwardCommand : ICommand
{
    private readonly IMovementStrategy _movementStrategy;

    public MoveForwardCommand(IMovementStrategy movementStrategy)
    {
        _movementStrategy = movementStrategy;
    }

    public void Execute(Rover rover, Plateau plateau, List<(int X, int Y)> occupiedPositions)
    {
        _movementStrategy.Move(rover, plateau, occupiedPositions);
    }
}

// Moviment strategy interface
public interface IMovementStrategy
{
    void Move(Rover rover, Plateau plateau, List<(int X, int Y)> occupiedPositions);
}

// Default movement strategy
public class StandardMovementStrategy : IMovementStrategy
{
    public void Move(Rover rover, Plateau plateau, List<(int X, int Y)> occupiedPositions)
    {
        int newX = rover.X;
        int newY = rover.Y;

        switch (rover.Direction)
        {
            case 'N':
                newY = rover.Y + 1;
                break;
            case 'E':
                newX = rover.X + 1;
                break;
            case 'S':
                newY = rover.Y - 1;
                break;
            case 'W':
                newX = rover.X - 1;
                break;
        }

        if (newX < 0 || newX > plateau.Width || newY < 0 || newY > plateau.Height)
        {
            throw new InvalidOperationException("Movimento inválido: Rover sairia do planalto.");
        }

        if (occupiedPositions.Contains((newX, newY)))
        {
            throw new InvalidOperationException("Movimento inválido: Posição já ocupada por outra sonda.");
        }

        occupiedPositions.Remove((rover.X, rover.Y));
        rover.X = newX;
        rover.Y = newY;
        occupiedPositions.Add((rover.X, rover.Y));
    }
}

public class RoverService
{
    private readonly List<(int X, int Y)> _occupiedPositions = new List<(int X, int Y)>();
    private readonly IMovementStrategy _movementStrategy;

    public RoverService(IMovementStrategy movementStrategy)
    {
        _movementStrategy = movementStrategy;
    }

    public Rover MoveRover(Rover rover, Plateau plateau, string commands)
    {
        _occupiedPositions.Add((rover.X, rover.Y));

        foreach (var command in commands)
        {
            ICommand cmd = command switch
            {
                'L' => new TurnLeftCommand(),
                'R' => new TurnRightCommand(),
                'M' => new MoveForwardCommand(_movementStrategy),
                _ => throw new ArgumentException("Comando inválido")
            };

            cmd.Execute(rover, plateau, _occupiedPositions);
        }
        return rover;
    }
}